import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ColonyRole, ROOT_DOMAIN_ID } from '@colony/colony-js';
import { FormikProps } from 'formik';
import { FormattedMessage, defineMessages } from 'react-intl';
import sortBy from 'lodash/sortBy';

import Button from '~core/Button';
import { ActionDialogProps } from '~core/Dialog';
import ColorSelect from '~core/ColorSelect';
import { Color } from '~core/ColorTag';
import DialogSection from '~core/Dialog/DialogSection';
import { Input, Annotations, Select } from '~core/Fields';
import Heading from '~core/Heading';
import PermissionsLabel from '~core/PermissionsLabel';
import PermissionRequiredInfo from '~core/PermissionRequiredInfo';
import Toggle from '~core/Fields/Toggle';
import NotEnoughReputation from '~dashboard/NotEnoughReputation';
import MotionDomainSelect from '~dashboard/MotionDomainSelect';

import { useLoggedInUser } from '~data/index';
import { useTransformer } from '~utils/hooks';
import { useDialogActionPermissions } from '~utils/hooks/useDialogActionPermissions';

import { getAllUserRoles } from '../../../transformers';
import { canArchitect } from '../../../users/checks';

import { FormValues } from './EditDomainDialog';
import styles from './EditDomainDialogForm.css';

const MSG = defineMessages({
  titleEdit: {
    id: 'dashboard.EditDomainDialog.EditDomainDialogForm.titleEdit',
    defaultMessage: 'Edit team details',
  },
  name: {
    id: 'dashboard.EditDomainDialog.EditDomainDialogForm.name',
    defaultMessage: 'Team name',
  },
  domain: {
    id: 'dashboard.EditDomainDialog.EditDomainDialogForm.domain',
    defaultMessage: 'Select domain',
  },
  purpose: {
    id: 'dashboard.EditDomainDialog.EditDomainDialogForm.name',
    defaultMessage: 'What is the purpose of this team?',
  },
  annotation: {
    id: 'dashboard.EditDomainDialog.EditDomainDialogForm.annotation',
    defaultMessage: 'Explain why you’re editing this team',
  },
  noPermission: {
    id:
      // eslint-disable-next-line max-len
      'dashboard.EditDomainDialog.EditDomainDialogForm.noPermission',
    defaultMessage:
      // eslint-disable-next-line max-len
      'You need the {roleRequired} permission in {domain} to take this action.',
  },
});

interface Props extends ActionDialogProps {
  isSubmitting;
  isValid;
}

const EditDomainDialogForm = ({
  back,
  colony,
  colony: { domains },
  handleSubmit,
  isSubmitting,
  isValid,
  setFieldValue,
  setValues,
  values: { domainId, domainName, forceAction, motionDomainId },
  isVotingExtensionEnabled,
}: Props & FormikProps<FormValues>) => {
  const [domainColor, setDomainColor] = useState(Color.LightPink);
  const [currentFromDomain, setCurrentFromDomain] = useState<number>(
    parseInt(domainId, 10),
  );

  const { walletAddress, username, ethereal } = useLoggedInUser();
  const allUserRoles = useTransformer(getAllUserRoles, [colony, walletAddress]);

  const hasRegisteredProfile = !!username && !ethereal;

  const domainOptions = useMemo(
    () =>
      sortBy(
        domains
          .filter(({ ethDomainId }) => ethDomainId !== ROOT_DOMAIN_ID)
          .map(({ name, ethDomainId }) => ({
            value: ethDomainId.toString(),
            label: name,
          })),
        ['value'],
      ),

    [domains],
  );

  const hasRoles = hasRegisteredProfile && canArchitect(allUserRoles);

  const [userHasPermission, onlyForceAction] = useDialogActionPermissions(
    colony.colonyAddress,
    hasRoles,
    isVotingExtensionEnabled,
    forceAction,
    Number(domainId),
  );

  const canEditDomain =
    userHasPermission && Object.keys(domainOptions).length > 0;

  const inputDisabled = !canEditDomain || onlyForceAction;

  const handleDomainChange = useCallback(
    (selectedDomainValue) => {
      const selectedMotionDomainId = parseInt(motionDomainId, 10);
      const selectedDomainId = parseInt(selectedDomainValue, 10);
      const selectedDomain = domains.find(
        (domain) => domain.ethDomainId === selectedDomainId,
      );
      if (selectedDomain) {
        setValues({
          domainId: selectedDomain.ethDomainId.toString(),
          domainColor: selectedDomain.color,
          domainName: selectedDomain.name,
          domainPurpose: selectedDomain.description as string,
          forceAction,
          motionDomainId,
        });
        setDomainColor(selectedDomain.color);
        setCurrentFromDomain(selectedDomainId);
        if (
          selectedMotionDomainId !== ROOT_DOMAIN_ID &&
          selectedMotionDomainId !== selectedDomainId
        ) {
          setFieldValue('motionDomainId', selectedDomainId);
        }
      }
      return null;
    },
    [domains, forceAction, motionDomainId, setFieldValue, setValues],
  );

  const handleFilterMotionDomains = useCallback(
    (optionDomain) => {
      const optionDomainId = parseInt(optionDomain.value, 10);
      if (currentFromDomain === ROOT_DOMAIN_ID) {
        return optionDomainId === ROOT_DOMAIN_ID;
      }
      return (
        optionDomainId === currentFromDomain ||
        optionDomainId === ROOT_DOMAIN_ID
      );
    },
    [currentFromDomain],
  );

  const handleMotionDomainChange = useCallback(
    (motionDomainIdValue) =>
      setFieldValue('motionDomainId', motionDomainIdValue),
    [setFieldValue],
  );

  useEffect(() => {
    if (domainId) {
      handleDomainChange(domainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DialogSection appearance={{ theme: 'sidePadding' }}>
        <div className={styles.modalHeading}>
          {isVotingExtensionEnabled && (
            <div className={styles.motionVoteDomain}>
              <MotionDomainSelect
                colony={colony}
                onDomainChange={handleMotionDomainChange}
                disabled={forceAction}
                /*
                 * @NOTE We can only create a motion to vote in a subdomain if we
                 * create a payment from that subdomain
                 */
                filterDomains={handleFilterMotionDomains}
                initialSelectedDomain={
                  motionDomainId === undefined
                    ? motionDomainId
                    : Number(motionDomainId)
                }
              />
            </div>
          )}
          <div className={styles.headingContainer}>
            <Heading
              appearance={{ size: 'medium', margin: 'none', theme: 'dark' }}
              text={MSG.titleEdit}
            />
            {hasRoles && isVotingExtensionEnabled && (
              <Toggle
                label={{ id: 'label.force' }}
                name="forceAction"
                disabled={!canEditDomain}
              />
            )}
          </div>
        </div>
      </DialogSection>
      {!userHasPermission && (
        <DialogSection>
          <PermissionRequiredInfo requiredRoles={[ColonyRole.Architecture]} />
        </DialogSection>
      )}
      <DialogSection>
        <div className={styles.nameAndColorContainer}>
          <div className={styles.domainName}>
            <Select
              options={domainOptions}
              label={MSG.domain}
              onChange={handleDomainChange}
              name="domainId"
              appearance={{ theme: 'grey', width: 'fluid' }}
            />
          </div>
          <ColorSelect
            activeOption={domainColor}
            appearance={{ alignOptions: 'right' }}
            onColorChange={setDomainColor}
            disabled={inputDisabled}
            name="domainColor"
          />
        </div>
      </DialogSection>
      <DialogSection>
        <Input
          label={MSG.name}
          name="domainName"
          appearance={{ colorSchema: 'grey', theme: 'fat' }}
          disabled={inputDisabled}
          maxLength={20}
        />
      </DialogSection>
      <DialogSection>
        <Input
          label={MSG.purpose}
          name="domainPurpose"
          appearance={{ colorSchema: 'grey', theme: 'fat' }}
          disabled={inputDisabled}
          maxLength={90}
        />
      </DialogSection>
      <DialogSection>
        <Annotations
          label={MSG.annotation}
          name="annotationMessage"
          disabled={inputDisabled}
        />
      </DialogSection>
      {!userHasPermission && (
        <DialogSection appearance={{ theme: 'sidePadding' }}>
          <div className={styles.noPermissionFromMessage}>
            <FormattedMessage
              {...MSG.noPermission}
              values={{
                roleRequired: (
                  <PermissionsLabel
                    permission={ColonyRole.Architecture}
                    name={{ id: `role.${ColonyRole.Architecture}` }}
                  />
                ),
                domain: domainName,
              }}
            />
          </div>
        </DialogSection>
      )}
      {onlyForceAction && (
        <NotEnoughReputation
          appearance={{ marginTop: 'negative' }}
          domainId={Number(domainId)}
        />
      )}
      <DialogSection appearance={{ align: 'right', theme: 'footer' }}>
        {back && (
          <Button
            text={{ id: 'button.back' }}
            onClick={back}
            appearance={{ theme: 'secondary', size: 'large' }}
          />
        )}
        <Button
          text={{ id: 'button.confirm' }}
          appearance={{ theme: 'primary', size: 'large' }}
          onClick={() => handleSubmit()}
          loading={isSubmitting}
          disabled={inputDisabled || !isValid}
        />
      </DialogSection>
    </>
  );
};

export default EditDomainDialogForm;
