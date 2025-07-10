import { Test, TestingModule } from '@nestjs/testing';
import { SkillRepository } from './skill.repository';
import { DrizzleDataServiceModule } from '../drizzle-data.module';
import { EnvConfigModule } from '@libs/config/env';

describe('SkillRepository', () => {
  let skillRepository: SkillRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule, DrizzleDataServiceModule],
      providers: [SkillRepository],
    }).compile();

    skillRepository = module.get<SkillRepository>(SkillRepository);
  });

  afterAll(async () => {});

  beforeEach(async () => {});

  it('should create a skill and return it', async () => {
    const skillName = 'NestJS';
    const created = await skillRepository.createAndReturn({ name: skillName });

    expect(created).toBeDefined();
    expect(created.id).toBeGreaterThan(0);
    expect(created.name).toBe(skillName);
  });

  it('should find a skill by name', async () => {
    const skillName = 'TypeScript';
    await skillRepository.createAndReturn({ name: skillName });

    const found = await skillRepository.findByName(skillName);
    expect(found).toBeDefined();
    expect(found?.name).toBe(skillName);
  });

  it('should return null if skill not found', async () => {
    const result = await skillRepository.findByName('NonExistentSkill');
    expect(result).toBeNull();
  });
});
