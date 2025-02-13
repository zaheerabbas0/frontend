import React, { useState } from 'react';
import FormHeader from '../../../../components/ui/Form/FormHeader';
import DetailRow from './detailOutlined';
import CustomAvatar from '../../../../styledComponents/CustomAvatar';
import { Avatar, Row, Switch } from 'antd';
import { CustomButton } from '../../../../styledComponents/CustomButton';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { NoCustomerAssigned } from './customerDetail';
import dayjs from 'dayjs';
import { updateContract } from '../../../../reduxToolkit/features/ContractSlice';
import { useDispatch } from 'react-redux';
import { Project_Route_Name } from '../../../../constants/project/TitleRoutesConstants';
import { hasPermission } from '../../../../constants/UsersRole';

const ContractDetail = ({ contract, isCustomerAssigned }) => {
  const [autoRenew, setAutoRenew] = useState(contract?.auto_renew === 'true');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  if (!contract) {
    return (
      <NoCustomerAssigned
        disabled={!isCustomerAssigned || !hasPermission('create:contract')}
        onClick={() => {
          if (isCustomerAssigned) {
            navigate(`/supportx/${Project_Route_Name}/create-contract`, {
              state: { projectId },
            });
          }
        }}
      >
        <div>No Contract assigned</div>
        <div width="100px" variant="default">
          {isCustomerAssigned
            ? 'Add Contract'
            : 'To Create a Contract Assign a Customer'}
        </div>
      </NoCustomerAssigned>
    );
  }

  const collaborators = contract?.collaborators || [];

  const contractDetails = {
    ContractName: contract.name,
    Type: contract.contract_type,
    Status: contract.status,
    Customer: contract?.customer?.name || '',
    VisibleTo: () => (
      <Avatar.Group
        max={{
          count: 4,
          style: {
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          },
        }}
      >
        {contract?.visible_to?.map((c) => (
          <CustomAvatar
            key={c.id}
            name={c.name}
            image_url={c.image_url}
            size="medium"
          />
        ))}
      </Avatar.Group>
    ),
    VendorName: contract.vendor_name,
    Collaborators: () => (
      <Avatar.Group
        max={{
          count: 4,
          style: {
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          },
        }}
      >
        {collaborators.map((c) => (
          <CustomAvatar
            key={c.id}
            name={c.name}
            image_url={c.image_url}
            size="medium"
          />
        ))}
      </Avatar.Group>
    ),
    Cost: `$${contract?.cost || 0.0}`,
    StartDate: contract?.start_date
      ? dayjs(contract.start_date).format('DD/MM/YYYY')
      : '',
    DueDate: contract?.due_date
      ? dayjs(contract.due_date).format('DD/MM/YYYY')
      : '',
    Attachment: contract?.attachment_file ? (
      <a
        href={contract.attachment_file}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Attachment
      </a>
    ) : (
      <div>No File Uploded</div>
    ),
  };

  const handleContractEdit = () => {
    navigate(`/supportx/${Project_Route_Name}/edit-contract/${contract?.id}`, {
      state: {
        projectId,
        contract: { ...contract, auto_renew: autoRenew },
      },
    });
  };

  const handleSwitchClick = () => {
    setLoading(true);
    const updatedContract = {
      ...contract,
      auto_renew: contract.auto_renew === 'true' ? 'false' : 'true',
    };
    dispatch(
      updateContract({
        id: contract.id,
        updatedContract: {
          auto_renew: autoRenew ? 'false' : 'true',
        },
      })
    )
      .unwrap()
      .then((response) => {
        if (response) {
          setAutoRenew(
            response.updatedContract.contract?.auto_renew === 'true'
          );
        }
      });
    setLoading(false);
  };

  return (
    <>
      <FormHeader withBackButton={false} title="Contract" showDate={false}>
        <span>
          <Switch
            style={{ marginRight: '10px' }}
            checked={autoRenew}
            onClick={() => handleSwitchClick()}
            disabled={!hasPermission('update:contract') || loading}
          />
          Auto renew
        </span>
      </FormHeader>
      <DetailRow
        details={contractDetails}
        rowStyles={{ margin: '10px 45px' }}
      />
      <Row
        style={{
          justifyContent: 'center',
          marginTop: '30px',
          gap: '15px',
        }}
      >
        <CustomButton
          width="100px"
          variant="default"
          onClick={handleContractEdit}
        >
          <EditOutlined /> Edit
        </CustomButton>
        {/* <CustomButton width="100px" variant="danger">
          Disable
        </CustomButton> */}
      </Row>
    </>
  );
};

export default ContractDetail;
