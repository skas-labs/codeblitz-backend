import {User} from "./entities/User";
import {createConnection} from "typeorm";
import {Player} from "./entities/Player";

export const Entities = {
    User, Player
}

export async function connect() {
    return await createConnection({
        type: "postgres",
        username: "codeblitz",
        database: "codeblitz",
        password: "codeblitz",
        entities: [User, Player],
        logger: "debug",
        logging: "all",
        synchronize: true,
        dropSchema: true
    })
}

// TODO: --- For testing remove ---
connect().then((c) => {
    console.log(c.entityMetadatas)
}).catch(console.error)