import { Logger } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import { ParticipantIdentity } from '../src/models/participant-identity.model'
import { Player } from '../src/models/player.model'

const generateParticipantIdentity = (id: number): ParticipantIdentity =>
	new ParticipantIdentity(id, generatePlayer(id))

const generatePlayer = (id: number): Player =>
	new Player('p', `a${id}`, `sn${id}`, `s${id}`, 'p', `a${id}`, 'm', 0)

const toggleMockedLogger = (
	testModule: TestingModule,
	enable = true,
): Record<string, jest.Mock> => {
	const logger: Logger = testModule.get(Logger)
	let mockDebug: jest.Mock
	let mockError: jest.Mock
	let mockLog: jest.Mock
	let mockVerbose: jest.Mock

	if (enable) {
		mockDebug = jest.fn()
		mockError = jest.fn()
		mockLog = jest.fn()
		mockVerbose = jest.fn()

		jest.spyOn(logger, 'debug').mockImplementation(mockDebug)
		jest.spyOn(logger, 'error').mockImplementation(mockError)
		jest.spyOn(logger, 'log').mockImplementation(mockLog)
		jest.spyOn(logger, 'verbose').mockImplementation(mockVerbose)
	} else {
		mockDebug = logger.debug as jest.Mock
		mockError = logger.error as jest.Mock
		mockLog = logger.log as jest.Mock
		mockVerbose = logger.verbose as jest.Mock

		jest.spyOn(logger, 'debug').mockRestore()
		jest.spyOn(logger, 'error').mockRestore()
		jest.spyOn(logger, 'log').mockRestore()
		jest.spyOn(logger, 'verbose').mockRestore()
	}

	return {
		mockDebug,
		mockError,
		mockLog,
		mockVerbose,
	}
}

export { generateParticipantIdentity, generatePlayer, toggleMockedLogger }
