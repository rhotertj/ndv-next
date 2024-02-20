"use client;"
import {PlayerRating} from '@/types/player';
import * as d3 from "d3";

export async function Heatmap({
  homePlayers,
  awayPlayers
  }: {
    homePlayers: PlayerRating[],
    awayPlayers: PlayerRating[]
}) {

    // this should be somewhat dynamic up unitl max values
    let height = 600
    let width = 1024   

    return (
      <div>Heatmap</div>
      // https://2019.wattenberger.com/blog/react-and-d3
      // Render a blob for each player pair, have a color scale (maybe we can show that)
      // color based on winning percentage, 
      // and render text on hover below
    )
  }