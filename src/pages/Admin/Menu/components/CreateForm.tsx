import {
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React from 'react';
import { addMenu } from '../services';

const CreateForm: React.FC<MenuTreeProps> = ({ menuTree, refreshMenuTree, roleItems }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (params: MenuItem) => {
    await addMenu(params);
    await refreshMenuTree();
    await message.success('添加成功');
  };

  return (
    <>
      {menuTree.length > 0 && (
        <ProForm<MenuItem>
          layout="horizontal"
          form={form}
          labelCol={{ span: 4 }}
          submitter={{
            resetButtonProps: {
              style: { marginLeft: 300 },
            },
          }}
          onFinish={handleSubmit}
        >
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

          <ProFormText
            label="组件"
            width="md"
            name="component"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入组件',
            //   },
            // ]}
          />

          <ProFormSwitch label="是否隐藏" name="hidenInMenu" />
          <ProFormSelect
            width="md"
            name="roles"
            label="角色"
            mode="multiple"
            valueEnum={roleItems}
          />
        </ProForm>
      )}
    </>
  );
};

export default CreateForm;
