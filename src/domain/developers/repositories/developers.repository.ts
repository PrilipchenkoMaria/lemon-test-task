// **************************************************************************
// Репозиторій імітує шар підключення до бази данних. Данні знаходяться в data.ts
// **************************************************************************

import { injectable } from 'inversify';
import { IDeveloper } from '../types'
import { contracts, developers } from './data'

@injectable()
export class DevelopersRepository {

	async getDevelopers(includeRevenue: boolean): Promise<IDeveloper[]>{
		if (includeRevenue) {
			// In the real application, this would be done in the database query
			const revenueByDeveloper = contracts
				.filter(c => c.status === 'completed')
				.reduce((acc, c) => {
					acc[c.developerId] = (acc[c.developerId] || 0) + c.amount;
					return acc;
				}, {});

			return developers.map(d => ({
				...d,
				revenue: revenueByDeveloper[d.id] || 0
			}));
		}

		return developers
	}

	async getDeveloperById(id: string): Promise<IDeveloper>{
		return developers.find(d => d.id === id)
	}

	async getContracts(){
		return contracts
	}

}
