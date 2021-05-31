// Environment constants
export const ENV_API_KEY = 'RIOT_SECRET'
export const ENV_API_KEY_DEFAULT = ''
export const ENV_API_PORT = 'API_PORT'
export const ENV_API_PORT_DEFAULT = 3000
export const ENV_API_SECRET_KEY = 'SERVER_SECRET'
export const ENV_API_SECRET_KEY_DEFAULT = ''

export const DEFAULT_TOTAL_MASTERY_SCORE = -1

// API constants
export const MAX_NUM_MATCHES = 100
export const MIN_NUM_MATCHES = 1
export const REGION = 'na1'

// Time constants
export const TIME_HOURS_IN_DAY = 24
export const TIME_MILLIS_IN_SECOND = 1000
export const TIME_MINS_IN_HOUR = 60
export const TIME_SECS_IN_MINUTE = 60

// File constants
export const ENCODING_UTF8 = 'utf8'
// more info: https://nodejs.org/api/fs.html#fs_file_system_flags
export const READ_AND_WRITE = 'r+'
export const WRITE_CREATE_OR_TRUNCATE = 'w'

// Calculated constants
export const TIME_MILLIS_IN_DAY =
	TIME_MILLIS_IN_SECOND *
	TIME_SECS_IN_MINUTE *
	TIME_MINS_IN_HOUR *
	TIME_HOURS_IN_DAY
