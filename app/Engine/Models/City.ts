import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface cityAttributes {
    id?: bigint;
    state_id?: bigint;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface cityCreationAttributes extends Optional<cityAttributes, "id"> { }

export class City extends Model<cityAttributes, cityCreationAttributes> implements cityAttributes {
    public id?: bigint;
    public state_id?: bigint;
    public name?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

City.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        state_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
            references: {
                model: 'states',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        name: {
            allowNull: false,
            type: DataTypes.STRING
        },

        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE
        }

    },
    {
        defaultScope: {},
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: "cities",
        sequelize: sequelize,
        paranoid: true
    }
)
