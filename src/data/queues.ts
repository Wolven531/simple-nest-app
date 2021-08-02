// more info - https://static.developer.riotgames.com/docs/lol/queues.json

export interface QueueInfo {
	description: string | null
	map: string
	notes: string | null
	queueId: number
}

const allQueues: QueueInfo[] = [
	{
		description: null,
		map: 'Custom games',
		notes: null,
		queueId: 0,
	},
	{
		description: '1v1 Snowdown Showdown games',
		map: 'Howling Abyss',
		notes: null,
		queueId: 72,
	},
	{
		description: '2v2 Snowdown Showdown games',
		map: 'Howling Abyss',
		notes: null,
		queueId: 73,
	},
	{
		description: '6v6 Hexakill games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 75,
	},
	{
		description: 'Ultra Rapid Fire games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 76,
	},
	{
		description: 'One For All: Mirror Mode games',
		map: 'Howling Abyss',
		notes: null,
		queueId: 78,
	},
	{
		description: '6v6 Hexakill games',
		map: 'Twisted Treeline',
		notes: null,
		queueId: 98,
	},
	{
		description: '5v5 ARAM games',
		map: "Butcher's Bridge",
		notes: null,
		queueId: 100,
	},
	{
		description: 'Nemesis games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 310,
	},
	{
		description: 'Black Market Brawlers games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 313,
	},
	{
		description: 'Definitely Not Dominion games',
		map: 'Crystal Scar',
		notes: null,
		queueId: 317,
	},
	{
		description: 'All Random games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 325,
	},
	{
		description: '5v5 Draft Pick games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 400,
	},
	{
		description: '5v5 Ranked Solo games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 420,
	},
	{
		description: '5v5 Blind Pick games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 430,
	},
	{
		description: '5v5 Ranked Flex games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 440,
	},
	{
		description: '5v5 ARAM games',
		map: 'Howling Abyss',
		notes: null,
		queueId: 450,
	},
	{
		description: 'Blood Hunt Assassin games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 600,
	},
	{
		description: 'Clash games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 700,
	},
	{
		description: 'URF games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 900,
	},
	{
		description: 'Ascension games',
		map: 'Crystal Scar',
		notes: null,
		queueId: 910,
	},
	{
		description: 'Legend of the Poro King games',
		map: 'Howling Abyss',
		notes: null,
		queueId: 920,
	},
	{
		description: 'Nexus Siege games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 940,
	},
	{
		description: 'Doom Bots Voting games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 950,
	},
	{
		description: 'Doom Bots Standard games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 960,
	},
	{
		description: 'PROJECT: Hunters games',
		map: 'Overcharge',
		notes: null,
		queueId: 1000,
	},
	{
		description: 'Snow ARURF games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 1010,
	},
	{
		description: 'One for All games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 1020,
	},
	{
		description: 'Teamfight Tactics games',
		map: 'Convergence',
		notes: null,
		queueId: 1090,
	},
	{
		description: 'Ranked Teamfight Tactics games',
		map: 'Convergence',
		notes: null,
		queueId: 1100,
	},
	{
		description: 'Teamfight Tactics test games',
		map: 'Convergence',
		notes: null,
		queueId: 1111,
	},
	{
		description: 'Nexus Blitz games',
		map: 'Nexus Blitz',
		notes: null,
		queueId: 1300,
	},
	{
		description: 'Ultimate Spellbook games',
		map: "Summoner's Rift",
		notes: null,
		queueId: 1400,
	},
]

export { allQueues }
