"""empty message

Revision ID: 6fb5269e96a0
Revises: e0bd266b074c
Create Date: 2024-01-31 14:14:28.018343

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6fb5269e96a0'
down_revision = 'e0bd266b074c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_emotion',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('emotion_id', sa.Integer(), nullable=True),
    sa.Column('emotion_intensity', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['emotion_id'], ['emotions.id'], name=op.f('fk_user_emotion_emotion_id_emotions')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_emotion_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('users_emotions')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_emotions',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('emotion_id', sa.INTEGER(), nullable=True),
    sa.Column('emotion_intensity', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['emotion_id'], ['emotions.id'], name='fk_users_emotions_emotion_id_emotions'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_users_emotions_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user_emotion')
    # ### end Alembic commands ###