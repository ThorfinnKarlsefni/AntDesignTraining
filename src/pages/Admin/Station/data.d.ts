interface toStationDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

interface transitStationDataType {
  key: React.Key;
  toStation: string;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}
