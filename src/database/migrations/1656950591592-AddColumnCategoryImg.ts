import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnCategoryImg1656950591592
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "category_products",
      new TableColumn({
        name: "category_products_img",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("category_products", "category_products_img");
  }
}
