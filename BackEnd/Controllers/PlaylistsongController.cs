﻿using BackEnd.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsongController : ControllerBase
    {
        private readonly IPlaylistsongInterface playlistsongInterface;

        public PlaylistsongController(IPlaylistsongInterface playlistsongInterface)
        {
            this.playlistsongInterface = playlistsongInterface;
        }

        [HttpPost("playlistsong")]
        public async Task<ActionResult<PlaylistSongDto>> Post(CreatePlaylistSongDto createPlaylistsongDto)
        {
            return StatusCode(201, await playlistsongInterface.Post(createPlaylistsongDto));
        }

        [HttpGet("allplaylistsong")]
        public async Task<IEnumerable<PlaylistSong>> Get()
        {
            return (IEnumerable<PlaylistSong>)await playlistsongInterface.GetAll();
        }

        [HttpGet("playlistsongbyid/{playlistid, songid}")]
        public async Task<ActionResult<PlaylistSong>> GetById(Guid playlistid, Guid songid)
        {
            PlaylistSong result = await playlistsongInterface.GetById(playlistid, songid);
            if (result == null)
            {
                return StatusCode(404, "Playlistsong with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{playlistid}/{songid}")]
        public async Task<ActionResult<PlaylistSong>> Put(Guid playlistid, Guid songid, ModifyPlaylistSongDto modifyPlaylistSongDto)
        {
            PlaylistSong result = await playlistsongInterface.Put(playlistid, songid, modifyPlaylistSongDto);

            if (result == null)
            {
                return StatusCode(404, $"Playlistsong with the id of {playlistid} and {songid} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{playlistid}/{songid}")]
        public async Task<ActionResult<PlaylistSong>> DeleteById(Guid playlistid, Guid songid)
        {
            PlaylistSong result = await playlistsongInterface.DeleteById(playlistid, songid);

            if (result == null)
            {
                return StatusCode(404, "There isn't a playlistsong with this id.");
            }

            return StatusCode(200, result);
        }
    }
}