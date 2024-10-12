import 'reflect-metadata'
import { request } from './setup/shortcuts'
import { createRequestWithContainerOverrides } from './setup/helpers'
import { DevelopersRepository } from '../src/domain/developers/repositories/developers.repository'

describe('Developers API tests examples', () => {

	describe('e2e, real repository used', () => {

		it('should BAT fetch developers', async () => {

			const result = await request.get(`/api/developers`)

			expect(result.status).toBe(200)
			expect(result.body?.length).toBeGreaterThan(0)

			for (const developer of result.body) {
				expect(developer).toHaveProperty('id')
				expect(developer).toHaveProperty('firstName')
				expect(developer).toHaveProperty('lastName')
				expect(developer).toHaveProperty('email')
				expect(developer).not.toHaveProperty('revenue')
			}

		})

		it('should fetch developers with revenue when revenue=true', async () => {

			const result = await request.get(`/api/developers?revenue=true`)

			expect(result.status).toBe(200)
			expect(result.body?.length).toBeGreaterThan(0)

			for (const developer of result.body) {
				expect(developer).toHaveProperty('id')
				expect(developer).toHaveProperty('firstName')
				expect(developer).toHaveProperty('lastName')
				expect(developer).toHaveProperty('email')
				expect(developer).toHaveProperty('revenue', expect.any(Number))
			}

		})

		it('should fetch developers without revenue when revenue=false', async () => {

			const result = await request.get(`/api/developers?revenue=false`)

			expect(result.status).toBe(200)
			expect(result.body?.length).toBeGreaterThan(0)

			for (const developer of result.body) {
				expect(developer).not.toHaveProperty('revenue')
			}

		})

	})

	it('should BAT get developer by id (mocked repository used)', async () => {

		const req = await createRequestWithContainerOverrides({
			'DevelopersRepository': {
				toConstantValue: {
					getDeveloperById: async (_id) => ({
						"id": "65de346c255f31cb84bd10e9",
						"email": "Brandon30@hotmail.com",
						"firstName": "Brandon",
						"lastName": "D'Amore"
					})
				} as Partial<DevelopersRepository>
			}
		})

		const result = await req.get(`/api/developers/65de346c255f31cb84bd10e9`)

		expect(result.status).toBe(200)

		const developer = result.body
		expect(developer).toHaveProperty('id')
		expect(developer).toHaveProperty('firstName')
		expect(developer).toHaveProperty('lastName')
		expect(developer).toHaveProperty('email')

	})

})
