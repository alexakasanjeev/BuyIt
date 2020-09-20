import { useCallback, useState, useEffect } from 'react';
import { Props } from '.';
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProductNavigatorParamsList } from '@navigator/product-navigator';
import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import { useDispatch } from 'react-redux';
import * as strings from '@locales/product-list';

type NavProps = NavigationProp<ProductNavigatorParamsList, 'ProductLists'>;

const useListCard = (props: Props) => {
  const { productList } = props;
  const [totalItems, setTotalItems] = useState(0);

  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();

  const onListPress = useCallback(() => {
    const listId = productList.id;
    navigation.navigate(Routes.ProductItems, { listId });
  }, []);

  const _handleEditItem = useCallback(() => {
    navigation.navigate(Routes.NewList, { productList });
  }, [productList]);

  const _handleDeleteItem = useCallback(() => {
    const listId = productList.id;
    dispatch(productListActions.deleteProductListAsync(listId));
  }, [productList]);

  const handleListLongPress = useCallback(() => {
    Alert.alert(strings.whatWant, strings.whatWantDo, [
      { text: strings.editItem, onPress: _handleEditItem },
      { text: strings.deleteItem, onPress: _handleDeleteItem },
    ]);
  }, [productList]);

  useEffect(() => {
    const qtdItems = productList.items?.length || 0;

    setTotalItems(qtdItems);
  }, [productList]);

  return {
    onListPress,
    productList,
    totalItems,
    handleListLongPress,
    _handleDeleteItem,
    _handleEditItem,
  };
};

export default useListCard;
