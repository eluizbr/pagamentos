import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticQueryService {
  constructor(private readonly esService: ElasticsearchService) {}

  async findAll(index: string, term: any) {
    const must = [];
    const keys = Object.keys(term);
    keys.forEach((key, index) =>
      must.push({
        match_phrase: {
          [key]: `${term[key]}`,
        },
      }),
    );
    const elastic = await this.esService.search({
      index,
      body: {
        query: {
          bool: { must },
        },
      },
    });

    if (elastic.body.hits) {
      return elastic.body.hits.hits.map((data: any) => {
        delete data._source._meta;
        return data._source;
      });
    }
    return [];
  }
  async findOne(index: string, term: any) {
    const must = [];
    const keys = Object.keys(term);
    keys.forEach((key, index) =>
      must.push({
        match_phrase: {
          [key]: `${term[key]}`,
        },
      }),
    );

    const elastic = await this.esService.search({
      index,
      body: {
        query: {
          bool: { must },
        },
      },
    });

    if (elastic.body.hits.hits) {
      if (elastic.body.hits.hits.length == 1) {
        delete elastic.body.hits.hits[0]._source._meta;
        return elastic.body.hits.hits[0]._source;
      }
      return elastic.body.hits.hits.map((data: any) => {
        delete data._source._meta;
        return data._source;
      });
    }
    return {};
  }
}
