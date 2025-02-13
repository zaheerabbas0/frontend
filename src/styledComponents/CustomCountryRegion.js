import styled from 'styled-components';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export const StyledCountryDropdown = styled(CountryDropdown)`
  width: 100%;
  background: #fafafa;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  font-size: 13.5px;
  padding: 4px 8px;
  height: 34px;
  &:focus,
  &:hover,
  &:active {
    border-color: green;
  }
`;

export const StyledRegionDropdown = styled(RegionDropdown)`
  width: 100%;
  background: #fafafa;
  font-size: 13.5px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 4px 8px;
  height: 34px;
  &:focus,
  &:hover,
  &:active {
    border-color: green;
  }
  .anticon {
    color: green !important;
  }
`;
