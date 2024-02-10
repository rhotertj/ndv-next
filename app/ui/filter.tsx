export function Filter({category} : {category: string}) {
    return (
        <div className="mx-5">
            <div className="label">
                <span className="label-text">{category}</span>
            </div>
            <select defaultValue="Alle" className="select select-bordered w-full max-w-xs select-sm rounded-lg">
                <option value="placeholder">Alle</option>
                <option value="placeholder">Han Solo</option>
                <option value="placeholder">Greedo</option>
            </select>
        </div>
    )
}