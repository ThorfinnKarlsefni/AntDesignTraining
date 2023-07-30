import '@umijs/max';
import { Input } from 'antd';
export type SiderTheme = 'light' | 'dark';
const { Search } = Input;
// export const SelectLang = () => {
//   return (
//     <UmiSelectLang
//       style={{
//         padding: 4,
//       }}
//     />
//   );
// };
// export const Question = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: 26,
//       }}
//       onClick={() => {
//         window.open('https://pro.ant.design/docs/getting-started');
//       }}
//     >
//       <QuestionCircleOutlined />
//     </div>
//   );
// };
const onSearch = (value: string) => console.log(value);

export const HeaderSeaerch = () => {
  return <Search placeholder="请输入运单号" onSearch={onSearch} enterButton />;
};
