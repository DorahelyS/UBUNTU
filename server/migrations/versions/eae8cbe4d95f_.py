"""empty message

Revision ID: eae8cbe4d95f
Revises: bb4b8772ff10
Create Date: 2024-02-08 13:50:39.381602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eae8cbe4d95f'
down_revision = 'bb4b8772ff10'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('emotions', schema=None) as batch_op:
        batch_op.drop_column('date_stamp')

    with op.batch_alter_table('user_emotion', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_stamp', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_emotion', schema=None) as batch_op:
        batch_op.drop_column('date_stamp')

    with op.batch_alter_table('emotions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_stamp', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))

    # ### end Alembic commands ###