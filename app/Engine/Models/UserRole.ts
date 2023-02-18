import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface userRoleAttributes {
    id?: bigint;
    user_id?: bigint;
    role_id?: bigint;
    created_at?: Date;
    updated_at?: Date;
}

interface userRoleCreationAttributes extends Optional<userRoleAttributes, "id"> { }

export class UserRole extends Model<userRoleAttributes, userRoleCreationAttributes> implements userRoleAttributes {
    public id?: bigint;
    public user_id?: bigint;
    public role_id?: bigint;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

UserRole.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },

        role_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
    },
    {
        defaultScope: {},
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: "user_roles",
        sequelize: sequelize,
    }
)