import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("menu_open_close")
class OpenCloseHourMenu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("boolean")
  status: boolean;

  @Column("timestamp")
  hour_open: Date;

  @Column("timestamp")
  hour_close: Date;

  @Column("boolean")
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OpenCloseHourMenu;
