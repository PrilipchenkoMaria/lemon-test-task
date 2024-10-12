import { inject, injectable } from 'inversify';
import { DevelopersRepository } from '../repositories/developers.repository';
import { IDeveloper } from '../types'

@injectable()
export class DevelopersService {

	constructor(
		@inject('DevelopersRepository') private developersRepository: DevelopersRepository,
	) {}

	async getDevelopers(includeRevenue: boolean): Promise<IDeveloper[]>{
		return this.developersRepository.getDevelopers(includeRevenue)
	}

	async getDeveloperById(id: string){
		return this.developersRepository.getDeveloperById(id)
	}

}
