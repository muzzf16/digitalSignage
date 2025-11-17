import { Slide as PrismaSlide, InterestRate as PrismaInterestRate, News as PrismaNews, ExchangeRate as PrismaExchangeRate } from '@prisma/client'

export type Slide = Omit<PrismaSlide, 'features'> & {
  features: string[];
};

export type InterestRate = PrismaInterestRate;

export type News = PrismaNews;

export type ExchangeRate = PrismaExchangeRate;
