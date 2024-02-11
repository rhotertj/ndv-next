import { fetchMetaData, metaDataType } from "../lib/metadata";

export async function GeneralStats(){
    const data : metaDataType = await fetchMetaData();
    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
                <div className="stat-title text-secondary">Spieler</div>
                <div className="stat-value">{data.players}</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>
            
            <div className="stat">
                <div className="stat-title text-secondary">Matches</div>
                <div className="stat-value" >{data.matches}</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>

            <div className="stat">
                <div className="stat-title text-secondary">Wettbewerbe</div>
                <div className="stat-value">{data.competitions}</div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>
            
            
        </div>
    )
}