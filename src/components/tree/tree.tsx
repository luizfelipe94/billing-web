import { ReactNode, useState } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";

export type TreeData = {
  data: any[];
};

export type NodeProps = {
  node: {
    key: string;
    label: ReactNode;
    children: any[];
  };
};

export const Tree: React.FC<TreeData> = ({ data }: TreeData) => {
  return (
    <ul>
      {data && data.map((node) => (
        <TreeNode key={node.key} node={node} />
      ))}
    </ul>
  );
}

export const Expand: React.FC<{ show: boolean }> = ({ show }: { show: boolean }) => {
  return (
    <>
      {show ? <FaRegMinusSquare /> : <FaRegPlusSquare />}
    </>
  );
}

const TreeNode: React.FC<NodeProps> = (props: NodeProps) => {
  const { label, children } = props.node;
  const [showChildren, setShowChildren] = useState(false);
  const handleClick = () => {
    if (children && children.length > 0) {
      setShowChildren(!showChildren);
    }
  };
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}>
            {children && children.length > 0 && (
              <div onClick={handleClick}><Expand show={showChildren} /></div>
            )}
          </div>
          <div>{label}</div>
        </div>
      </div>
      <ul style={{ paddingLeft: "20px", borderLeft: "1px solid black" }}>
        {showChildren && <Tree data={children} />}
      </ul>
    </>
  );
}