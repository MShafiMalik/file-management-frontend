import { FileType } from "../enums";

type TFile = {
  _id: string;
  name: string;
  path: string;
  type: FileType;
  size: number;
  tags: string[];
  views: number;
  user: string;
};

export default TFile;
