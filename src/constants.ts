import { ALL_QUEUES } from './data/queues'
import * as usersJsonData from './data/users.json'

// Environment constants
export const ENV_API_KEY = 'RIOT_SECRET'
export const ENV_API_KEY_DEFAULT = ''
export const ENV_API_PORT = 'API_PORT'
export const ENV_API_PORT_DEFAULT = 3000
export const ENV_API_SECRET_KEY = 'SERVER_SECRET'
export const ENV_API_SECRET_KEY_DEFAULT = ''

export const DEFAULT_TOTAL_MASTERY_SCORE = -1

// API constants
export const COMMON_QUEUE_TYPES = {
	aram: { id: 450 },
	srNormalBlind: { id: 430 },
	srNormalDraft: { id: 400 },
	srRankedFlex: { id: 440 },
	srRankedSolo: { id: 420 },
	tftNormal: { id: 1090 },
	tftRanked: { id: 1100 },
}
// export const MAX_NUM_MATCHES = 100
export const MAX_NUM_MATCHES = 19 // need soft cap here until rate limit is in place
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

// Key constants
export const KEY_RATE_APP_LONG = 'app-long-term'
export const KEY_RATE_APP_SHORT = 'app-short-term'
export const KEY_RATE_METHOD_GAME = 'method-get-game'

// Calculated constants
export const TIME_MILLIS_IN_DAY =
	TIME_MILLIS_IN_SECOND *
	TIME_SECS_IN_MINUTE *
	TIME_MINS_IN_HOUR *
	TIME_HOURS_IN_DAY

const accountIdExamples: any = {}
accountIdExamples['Custom Account ID'] = { value: '' }

const queueTypeExamples: any = {}
queueTypeExamples['Default (not specified)'] = {
	value: undefined,
}

const searchKeyExamples: any = {}
searchKeyExamples['Custom searchKey'] = { value: '' }

const summonerIdExamples: any = {}
summonerIdExamples['Custom Summoner ID'] = { value: '' }

// TODO - add support for all queues
Object.keys(COMMON_QUEUE_TYPES).forEach(
	(queueType: keyof typeof COMMON_QUEUE_TYPES) => {
		const { id } = COMMON_QUEUE_TYPES[queueType]
		const queue = ALL_QUEUES.find(({ queueId }) => queueId === id)

		queueTypeExamples[`${queue?.description} - ${queueType}`] = {
			value: queueType,
		}
	},
)

usersJsonData.forEach((user) => {
	accountIdExamples[`Account ID for ${user.name}`] = {
		value: user.accountId,
	}
	searchKeyExamples[`Search for ${user.name}`] = {
		value: user.name,
	}
	summonerIdExamples[`Summoner ID for ${user.name}`] = {
		value: user.summonerId,
	}
})

export {
	accountIdExamples,
	queueTypeExamples,
	searchKeyExamples,
	summonerIdExamples,
}
