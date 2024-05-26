import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import React from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree, NodeId } from "react-accessible-treeview";
import cx from "classnames";
import "./styles.css";

import ProductServices from "@/app/services/api/product-api";

const folder = {
  name: "",
  children: [
    {
      name: "Fruits",
      children: [
        { name: "Avocados" },
        { name: "Bananas" },
        { name: "Berries" },
        { name: "Oranges" },
        { name: "Pears" },
      ],
    },
    {
      name: "Drinks",
      children: [
        {
          name: "Hot drinks",
          children: [
            {
              name: "Non-alcohol",
              children: [
                {
                  name: "Tea",
                  children: [
                    {
                      name: "Black Tea",
                      children: [{ name: "Earl Grey" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Vegetables",
      children: [{ name: "Beets" }],
    },
  ],
};

const data = flattenTree(folder);

interface Category {
  _id: string;
  category_name: string;
  path: string;
  level: number;
  children: Category[];
  created_at: string;
  updated_at: string;
}

export default function CategorySelector({
  selectedCategoryId,
  setSelectedCategoryId,
}: {
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
}) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tree, setTree] = useState<any>({});
  const [listCategory, setListCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductServices.fetchAllCategories();
        const items = response.items ? response.items : [];
        setListCategory(items);
        const tree = buildTreeCategory(items);
        setTree(tree);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      // console.log("selectedCategoryId", selectedCategoryId);
      // console.log("listCategory", listCategory);
      const node = listCategory.find((item) => item._id === selectedCategoryId);
      //console.log("node", node);
      if (node) {
        setSelectedCategory(node.category_name);
        setInputValue(getNodePath(node.category_name));
      }
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    setInputValue(getNodePath(selectedCategory));
  }, [selectedCategory]);

  const buildTreeCategory = (categories: any) => {
    categories = categories.map((category: any) => {
      const { category_name, ...rest } = category;
      return { name: category_name, ...rest };
    });
    const categoryMap: { [key: string]: any } = {};
    const tree: any[] = [];
    // Initialize each category in the map
    categories.forEach((category: any) => {
      category.children = [];
      categoryMap[category._id] = category;
    });
    // Build the tree structure
    categories.forEach((category: any) => {
      if (category.path === `/${category._id}`) {
        tree.push(category); // This is a root category
      } else {
        const parentPath = category.path.split("/").slice(1, -1).join("/");
        const parentId: string = parentPath.split("/").pop()!;
        if (categoryMap[parentId]) {
          categoryMap[parentId].children.push(category); // Add as a child of the parent
        }
      }
    });

    return {
      name: "",
      children: tree,
    };
  };

  const getNodeIdInTree = (tree: any, node_name: string): number | null => {
    let count = 0;
    const findNode = (node: any): number | null => {
      count++;
      if (node.name === node_name) {
        return count;
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const result = findNode(node.children[i]);
          if (result !== null) {
            return result;
          }
        }
      }
      return null;
    };
    return findNode(tree);
  };

  const getNodePath = (node_name: string) => {
    const node = listCategory.find((item) => item.category_name === node_name);
    if (!node) {
      return "";
    }
    if (node.level === 0) {
      return node.category_name;
    }
    const pathSegments = node.path.split("/").filter((item) => item !== "");
    const path = pathSegments
      .map((segment) => {
        const node = listCategory.find((item) => item._id === segment);
        return node ? node.category_name : "";
      })
      .join(" -> ");
    return path;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = () => {
    const selectedNode = listCategory.find(
      (item) => item.category_name === selectedCategory
    );
    if (selectedNode) {
      setSelectedCategoryId(selectedNode._id);
    }
    setShow(false);
  };

  return (
    <>
      <div className="mb-4">
        <label className="form-label">Category</label>
        <input
          type="text"
          placeholder="Select category"
          className="form-control"
          id="category_name"
          value={inputValue}
          onClick={handleShow}
          readOnly
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <div className="checkbox">
                <TreeView
                  data={flattenTree(tree)}
                  aria-label="Single select"
                  multiSelect={false}
                  propagateSelectUpwards
                  togglableSelect
                  selectedIds={[
                    getNodeIdInTree(tree, selectedCategory) as NodeId,
                  ]}
                  nodeAction="check"
                  nodeRenderer={({
                    element,
                    isBranch,
                    isExpanded,
                    isSelected,
                    isHalfSelected,
                    getNodeProps,
                    level,
                    handleSelect,
                    handleExpand,
                  }) => {
                    return (
                      <div
                        {...getNodeProps({ onClick: handleExpand })}
                        style={{ marginLeft: 40 * (level - 1) }}
                      >
                        {isBranch && (
                          <ArrowIcon isOpen={isExpanded} className={""} />
                        )}
                        {/* @ts-ignore */}
                        <CheckBoxIcon
                          className="checkbox-icon"
                          onClick={(e) => {
                            console.log("element", element);
                            handleSelect(e);
                            e.stopPropagation();
                            setSelectedCategory(element.name);
                          }}
                          variant={
                            isHalfSelected
                              ? "some"
                              : isSelected
                              ? "all"
                              : "none"
                          }
                        />
                        <span className="name">{element.name}</span>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const ArrowIcon = ({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className: string;
}) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }: { variant: string }) => {
  switch (variant) {
    case "all":
      return <FaCheckSquare {...rest} />;
    case "none":
      return <FaSquare {...rest} />;
    case "some":
      return <FaMinusSquare {...rest} />;
    default:
      return null;
  }
};
