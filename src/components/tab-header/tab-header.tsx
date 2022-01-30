type TabHeaderProps = {
  titleTab: string,
  nameTab: string,
  indexTab: number,
  currentIndexTab: number,
  handlerChangeTab: (tab: string) => void,
}

function TabHeader({titleTab, nameTab, indexTab, currentIndexTab, handlerChangeTab}: TabHeaderProps): JSX.Element {

  return (
    <span
      className={ indexTab === currentIndexTab ? 'button button--medium tabs__button' : 'button button--black-border button--medium tabs__button' }
      onClick={ () => handlerChangeTab(nameTab) }
    >
      {titleTab}
    </span>
  );

}

export {TabHeader};
