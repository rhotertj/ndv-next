import { fetchLastUpdate } from "../lib/metadata";

export async function Footer() {
    const lastUpdate : string = await fetchLastUpdate();
    console.log(`last update ${lastUpdate}`)
    return (
        <div>
            <div className="flex justify-center">Letzter Stand: {new Date(lastUpdate).toLocaleString("de-DE", {dateStyle: "long", timeStyle: "short"})} Uhr</div>
        </div>
    )
}