import { BaseEntity as TypeOrmBaseEntity, EntitySchema } from "typeorm";
import { instanceToPlain, Transform } from "class-transformer";

export class BaseEntity extends TypeOrmBaseEntity {
  @Transform(({ value }) => {
    // Exclude any properties that start with the __ prefix (added by TypeORM)
    const excludedKeys = Object.keys(value).filter(key => key.startsWith("__"));
    excludedKeys.forEach(key => delete value[key]);

    return value;
  })
  toJSON(): Record<string, unknown> {
    return instanceToPlain(this);
  }
}

export interface BaseEntityConstructor<T extends BaseEntity> {
  new (): T;
  schema: EntitySchema;
}
