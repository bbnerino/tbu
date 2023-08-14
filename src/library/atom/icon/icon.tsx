import { ButtonHTMLAttributes } from "react";
import SIZE_VARIANTS, { SizeType } from "../../_constants/size";
import COLOR, { ColorType } from "../../_constants/colors";
import { styled } from "styled-components";

const ICON_URL = "http://www.w3.org/2000/svg";

interface IconProps extends ButtonHTMLAttributes<HTMLElement> {
  size?: SizeType;
  color?: ColorType;
}

const Icon = ({ size = "md", color = "neutrals", ...props }: IconProps) => {
  return (
    <Wrapper size={SIZE_VARIANTS[size]}>
      <svg xmlns={ICON_URL} fill={COLOR[color]}>
        {props.children}
      </svg>
    </Wrapper>
  );
};

interface StyledProps {
  size: {
    width: string;
    height: string;
  };
}

const Wrapper = styled.div<StyledProps>`
  ${({ size }) => size}
  cursor: pointer;
`;

Icon.Delete = () => (
  <path d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99934 19.5493 5 19V6C4.71667 6 4.479 5.904 4.287 5.712C4.095 5.52 3.99934 5.28267 4 5C4 4.71667 4.096 4.479 4.288 4.287C4.48 4.095 4.71734 3.99934 5 4H9C9 3.71667 9.096 3.479 9.288 3.287C9.48 3.095 9.71734 2.99934 10 3H14C14.2833 3 14.521 3.096 14.713 3.288C14.905 3.48 15.0007 3.71734 15 4H19C19.2833 4 19.521 4.096 19.713 4.288C19.905 4.48 20.0007 4.71734 20 5C20 5.28334 19.904 5.521 19.712 5.713C19.52 5.905 19.2827 6.00067 19 6V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 16C9 16.2833 9.096 16.521 9.288 16.713C9.48 16.905 9.71734 17.0007 10 17C10.2833 17 10.521 16.904 10.713 16.712C10.905 16.52 11.0007 16.2827 11 16V9C11 8.71667 10.904 8.479 10.712 8.287C10.52 8.095 10.2827 7.99934 10 8C9.71667 8 9.479 8.096 9.287 8.288C9.095 8.48 8.99934 8.71734 9 9V16ZM13 16C13 16.2833 13.096 16.521 13.288 16.713C13.48 16.905 13.7173 17.0007 14 17C14.2833 17 14.521 16.904 14.713 16.712C14.905 16.52 15.0007 16.2827 15 16V9C15 8.71667 14.904 8.479 14.712 8.287C14.52 8.095 14.2827 7.99934 14 8C13.7167 8 13.479 8.096 13.287 8.288C13.095 8.48 12.9993 8.71734 13 9V16Z" />
);

Icon.Plus = () => (
  <path d="M11.9999 4.34991C12.3588 4.34991 12.6499 4.64093 12.6499 4.99991V11.3499H18.9999C19.3588 11.3499 19.6499 11.6409 19.6499 11.9999C19.6499 12.3589 19.3588 12.6499 18.9999 12.6499H12.6499V18.9999C12.6499 19.3589 12.3588 19.6499 11.9999 19.6499C11.6409 19.6499 11.3499 19.3589 11.3499 18.9999L11.3499 12.6499H4.99985C4.64087 12.6499 4.34985 12.3589 4.34985 11.9999C4.34985 11.6409 4.64087 11.3499 4.99985 11.3499H11.3499L11.3499 4.99991C11.3499 4.64093 11.6409 4.34991 11.9999 4.34991Z" />
);

Icon.Check = () => (
  <path d="M10.6 13.8L8.45 11.65C8.26667 11.4667 8.03333 11.375 7.75 11.375C7.46667 11.375 7.23333 11.4667 7.05 11.65C6.86667 11.8333 6.775 12.0667 6.775 12.35C6.775 12.6333 6.86667 12.8667 7.05 13.05L9.9 15.9C10.1 16.1 10.3333 16.2 10.6 16.2C10.8667 16.2 11.1 16.1 11.3 15.9L16.95 10.25C17.1333 10.0667 17.225 9.83333 17.225 9.55C17.225 9.26667 17.1333 9.03333 16.95 8.85C16.7667 8.66667 16.5333 8.575 16.25 8.575C15.9667 8.575 15.7333 8.66667 15.55 8.85L10.6 13.8ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22Z" />
);

Icon.Exclam = () => (
  <path
    fill-rule="evenodd"
    d="M18.3333 10C18.3333 14.6024 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6024 1.66663 10C1.66663 5.39765 5.39759 1.66669 9.99996 1.66669C14.6023 1.66669 18.3333 5.39765 18.3333 10ZM9.99996 11.6667C9.53972 11.6667 9.16663 11.2936 9.16663 10.8334V6.66669C9.16663 6.20645 9.53972 5.83335 9.99996 5.83335C10.4602 5.83335 10.8333 6.20645 10.8333 6.66669V10.8334C10.8333 11.2936 10.4602 11.6667 9.99996 11.6667ZM9.99996 12.5C9.53972 12.5 9.16663 12.8731 9.16663 13.3334C9.16663 13.7936 9.53972 14.1667 9.99996 14.1667C10.4602 14.1667 10.8333 13.7936 10.8333 13.3334C10.8333 12.8731 10.4602 12.5 9.99996 12.5Z"
  />
);

export default Icon;
