import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { useEffect } from 'react';
import { updateMenu } from '../services';

const UpdateForm: React.FC<UpdateFormProps> = ({
  open,
  setOpen,
  menuTree,
  roleItems,
  menuItem,
  refreshMenuTree,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // 当 menuItem 更新时，动态设置 initialValues
    if (open && menuItem) {
      form.setFieldsValue(menuItem);
    }
  }, [open, menuItem, form]);

  return (
    <>
      <ModalForm<MenuItem>
        title="编辑菜单"
        key={menuItem.id}
        open={open}
        form={form}
        autoFocusFirstInput
        submitTimeout={2000}
        labelCol={{ span: 4 }}
        width={600}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setOpen(false);
          },
        }}
        initialValues={menuItem}
        onFinish={async (updateMenuItem: MenuItem) => {
          await updateMenu(menuItem.id, updateMenuItem);
          message.success('更新成功');
          setOpen(false);
          refreshMenuTree();
          return true;
        }}
      >
        <ProFormText hidden={true} name="id" />

        <ProFormTreeSelect
          name="parentId"
          label="父级"
          width="md"
          placeholder="默认为父级"
          secondary
          fieldProps={{ treeDefaultExpandAll: true }}
          tooltip="默认为父级"
          request={async () => {
            return await menuTree;
          }}
        />
        <ProFormText
          width="md"
          rules={[
            { required: true, message: '请输入标题' },
            {
              max: 12,
              message: '标题不可超过12字符',
            },
          ]}
          name="name"
          label="标题"
        />
        <ProFormText width="sm" name="icon" label="图标" />
        <ProFormText
          width="md"
          name="path"
          rules={[
            {
              required: true,
              message: '请输入路径',
            },
          ]}
          label="路径"
        />

        <ProFormText label="组件" width="md" name="component" />

        <ProFormSwitch label="是否隐藏" name="hideInMenu" initialValue={menuItem?.hideInMenu} />
        <ProFormSelect width="md" name="roles" label="角色" mode="multiple" valueEnum={roleItems} />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
