const env = require('./env.json');
const node_env = process.env.NODE_ENV || 'development';

export default (key) => {
    return env[node_env][key];
}