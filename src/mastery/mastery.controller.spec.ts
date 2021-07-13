import { HttpModule, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { AppService } from '../services/app.service'
import { MasteryService } from '../services/mastery.service'
import { MasteryController } from './mastery.controller'

describe('MasteryController', () => {
	const fakeMasteryTotal = 57
	const fakeRiotToken = 'fake-token'
	const fakeSummonerId = 'some-summ-id'

	let controller: MasteryController
	let testModule: TestingModule
	let mockGetMasteryTotal: jest.Mock
	let mockGetRiotToken: jest.Mock

	beforeEach(async () => {
		mockGetMasteryTotal = jest.fn().mockResolvedValue(fakeMasteryTotal)
		mockGetRiotToken = jest.fn().mockReturnValue(fakeRiotToken)

		testModule = await Test.createTestingModule({
			controllers: [MasteryController],
			imports: [HttpModule],
			providers: [
				{
					provide: AppService,
					useFactory: () =>
						({
							getRiotToken: mockGetRiotToken,
						} as unknown as AppService),
				},
				{
					provide: MasteryService,
					useFactory: () =>
						({
							getMasteryTotal: mockGetMasteryTotal,
						} as unknown as MasteryService),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(MasteryController)
	})

	afterEach(async () => {
		await testModule.close()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		describe('invoke getMasteryTotal() w/ summonerId', () => {
			let resp: number

			beforeEach(async () => {
				resp = await controller.getMasteryTotal(fakeSummonerId)
			})

			it('invokes service methods properly and returns mocked value', () => {
				expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

				expect(mockGetMasteryTotal).toHaveBeenCalledTimes(1)
				expect(mockGetMasteryTotal).toHaveBeenLastCalledWith(
					fakeRiotToken,
					fakeSummonerId,
				)

				expect(resp).toBe(fakeMasteryTotal)
			})
		})
	})
})
