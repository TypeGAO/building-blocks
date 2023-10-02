// Use JSON to keep track of how many players each port/socket has
export const players: { [port: string]: number } = {};
// Use JSON to keep track of which codes correspond to which ports
export const codes: { [code: string]: string} = {};
