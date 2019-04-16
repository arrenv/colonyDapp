/* @flow */

// $FlowFixMe update flow
import React, { useCallback } from 'react';
import { defineMessages } from 'react-intl';

import type { TaskProps } from '~immutable';

import { ACTIONS } from '~redux';
import { useAsyncFunction } from '~utils/hooks';
import { log } from '~utils/debug';
import Heading from '~core/Heading';
import Button from '~core/Button';
import ItemsList from '~core/ItemsList';

import styles from './TaskSkills.css';

import taskSkillsTree from './taskSkillsTree';

const MSG = defineMessages({
  title: {
    id: 'dashboard.TaskSkills.title',
    defaultMessage: 'Skills',
  },
  selectSkill: {
    id: 'dashboard.TaskSkills.selectSkill',
    defaultMessage: `{skillSelected, select,
      undefined {Add +}
      other {Modify}
    }`,
  },
});

type Props = {|
  isTaskCreator: boolean,
  ...TaskProps<{ draftId: *, colonyAddress: *, skillId: * }>,
|};

const displayName = 'daskboard.TaskSKills';

const TaskSkills = ({
  colonyAddress,
  draftId,
  isTaskCreator,
  skillId,
}: Props) => {
  const setSkill = useAsyncFunction({
    submit: ACTIONS.TASK_SET_SKILL,
    success: ACTIONS.TASK_SET_SKILL_SUCCESS,
    error: ACTIONS.TASK_SET_SKILL_ERROR,
  });

  const handleSetSkill = useCallback(
    async (skillValue: Object) => {
      try {
        await setSkill({
          colonyAddress,
          draftId,
          skillId: skillValue.id,
        });
      } catch (error) {
        // TODO: handle this error properly / display it in some way
        log(error);
      }
    },
    [colonyAddress, draftId, setSkill],
  );

  return (
    <div className={styles.main}>
      {isTaskCreator && (
        <ItemsList
          list={taskSkillsTree}
          handleSetItem={handleSetSkill}
          name="taskSkills"
          connect={false}
          showArrow={false}
          itemId={skillId}
        >
          <div className={styles.controls}>
            <Heading
              appearance={{ size: 'small', margin: 'none' }}
              text={MSG.title}
            />
            <Button
              appearance={{ theme: 'blue', size: 'small' }}
              text={MSG.selectSkill}
              textValues={{ skillSelected: skillId }}
            />
          </div>
        </ItemsList>
      )}
    </div>
  );
};

TaskSkills.displayName = displayName;

export default TaskSkills;
