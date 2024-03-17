import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserEntity extends Model<UserEntity> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'password',
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'phone',
  })
  phone: string;
}
