import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails';

import { Container, Header, SongList } from './styles';

import Loading from '../../components/Loading';

import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

class Playlist extends Component {
    componentDidMount() {
        this.loadPlaylistDetails();
    }
    loadPlaylistDetails = () => {
        const { id } = this.props.match.params;
        this.props.getPlaylistDetailsRequest(id);
    };

    renderDetails = () => {
        const playlist = this.props.playlistDetails.data;
        return (
            <Container>
                <Header>
                    <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        srcset=""
                    />
                    <div>
                        <span>PLAYLIST</span>
                        <h1>{playlist.title}</h1>
                        {!!playlist.songs && <p>{playlist.songs} músicas</p>}
                        <button>PLAY</button>
                    </div>
                </Header>
                <SongList cellPadding={0} cellSpacing={0}>
                    <thead>
                        <th />
                        <th>Título</th>
                        <th>Artista</th>
                        <th>Album</th>
                        <th>
                            <img src={ClockIcon} alt="Duracao" srcset="" />
                        </th>
                    </thead>

                    <tbody>
                        {!playlist.songs ? (
                            <tr>
                                <td colSpan={5}>Nenhuma música cadastrada</td>
                            </tr>
                        ) : (
                            playlist.songs.map(song => (
                                <tr>
                                    <td>
                                        <img
                                            src={PlusIcon}
                                            alt="Add"
                                            srcset=""
                                        />
                                    </td>
                                    <td>{song.title}</td>
                                    <td>{song.author}</td>
                                    <td>{song.album}</td>
                                    <td>3:26</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </SongList>
            </Container>
        );
    };
    render() {
        return this.props.playlistDetails.loading ? (
            <Container>
                <Loading />
            </Container>
        ) : (
            this.renderDetails()
        );
    }
}

const mapStateToProps = state => ({
    playlistDetails: state.playlistDetails
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(PlaylistDetailsActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);
