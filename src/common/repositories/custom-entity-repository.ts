import { FilterQuery, FindOptions } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql'; // or any other driver package

import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { PageMetaDto } from 'src/common/dto/page/page-meta.dto';

export class CustomEntityRepository<
  T extends object,
> extends EntityRepository<T> {
  public async findPage<P extends string = never>(
    pageOptionsDto: PageOptionsDto,
    where?: FilterQuery<T>,
    options?: FindOptions<T, P>,
  ) {
    const { skip, take, order } = pageOptionsDto;
    const [items, itemCount] = await super.findAndCount(where || {}, {
      orderBy: order,
      offset: skip,
      limit: take,
      ...options,
    });
    return new PageDto(
      items,
      new PageMetaDto({
        itemCount,
        pageOptionsDto,
      }),
    );
  }
}
