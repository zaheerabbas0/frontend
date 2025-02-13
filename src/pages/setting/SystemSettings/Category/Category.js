import React, { useEffect, useState } from 'react';
import './Category.css';
import FormHeader from '../../../../components/ui/Form/FormHeader';
import { CustomButton } from '../../../../styledComponents/CustomButton';
import { PlusOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import styled from 'styled-components';
import CreateCategoryModal from '../../../../modals/tickets/addCategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  deleteCategory,
  deleteSubCategory,
} from '../../../../reduxToolkit/features/CategorySlice';
import CreateSubCategoryModal from '../../../../modals/tickets/addSubCategoryModal';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import RemoveIcon from '../../../../assets/icons/removeTagIcon.svg';
import Swal from 'sweetalert2';
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const Category = () => {
  const dispatch = useDispatch();
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [categoryID, setCategoryID] = useState();

  const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);
  const {
    categories: reduxCategories = [],
    status,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    if (status === 'succeeded' && reduxCategories) {
      setCategories(reduxCategories?.data);
    }
  }, [reduxCategories, status]);
  const [categories, setCategories] = useState([]);
  const addCategory = () => {
    setAddCategoryModal(true);
  };
  const addSubCategory = (categoryid) => {
    setAddSubCategoryModal(true);
    setCategoryID(categoryid);
  };
  const handleDeleteCategory = async (categoryid) => {
    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to delete this Category?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });

      if (confirmation.isConfirmed) {
        dispatch(deleteCategory(categoryid));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const handleDeleteSubCategory = async (subCategoryID) => {
    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to delete this SubCategory?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });

      if (confirmation.isConfirmed) {
        dispatch(deleteSubCategory(subCategoryID));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className="category-container">
      <CreateCategoryModal
        addCategoryModal={addCategoryModal}
        setAddCategoryModal={setAddCategoryModal}
      />
      <CreateSubCategoryModal
        addSubCategoryModal={addSubCategoryModal}
        setAddSubCategoryModal={setAddSubCategoryModal}
        categoryID={categoryID}
      />
      <CustomSpin spinning={status === 'loadingCategories' ? true : false}>
        <FormHeader
          title="Category"
          showDate={false}
          className="form-header"
          renderChildrenOnLeft={true}
        >
          <div className="inner-category-container">
            <div>
              <CustomButton
                icon={<PlusOutlined />}
                variant="inputTag"
                onClick={addCategory}
              >
                Add New Category
              </CustomButton>
            </div>
          </div>
        </FormHeader>
        <CardContainer>
          {categories &&
            categories.length > 0 &&
            categories?.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="category-card">
                <div className="category-card-container">
                  <h3 className="category-heading">{category.name} </h3>
                  <img
                    src={RemoveIcon}
                    alt="Remove Icon"
                    className="delete-icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  />
                  {/* <DeleteOutlined
                    className="delete-icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  /> */}
                </div>
                {category?.subcategories?.length > 0 ? (
                  category.subcategories.map((subCategory, index) => (
                    <div key={index} className="category-card-container">
                      <p className="sub-categories">{subCategory.name}</p>
                      <img
                        src={RemoveIcon}
                        alt="Remove Icon"
                        className="delete-icon-subCategory"
                        onClick={() => handleDeleteSubCategory(subCategory.id)}
                      />
                      {/* <DeleteOutlined
                        className="delete-icon-subCategory"
                        onClick={() => handleDeleteSubCategory(subCategory.id)}
                      /> */}
                    </div>
                  ))
                ) : (
                  <p>No Subcategories</p>
                )}
                <CustomButton
                  variant="inputTag"
                  icon={<PlusOutlined />}
                  onClick={() => addSubCategory(category.id)}
                >
                  Add New
                </CustomButton>
              </Card>
            ))}
        </CardContainer>
        &nbsp;
      </CustomSpin>
    </div>
  );
};

export default Category;
