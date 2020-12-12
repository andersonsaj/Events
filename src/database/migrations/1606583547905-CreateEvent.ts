import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEvent1606583547905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'place',
            type: 'varchar',
          },
          {
            name: 'dateEvent',
            type: 'timestamp with time zone',
          },
          {
            name: 'deadline',
            type: 'timestamp with time zone',
          },
          {
            name: 'minimumAge',
            type: 'int',
          },
          {
            name: 'maximumQuantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
  }
}
