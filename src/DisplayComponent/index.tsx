import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    marginTop: 24
  },
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400
  }
});

export interface DataResponse {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

interface Props {
  displayList: DataResponse;
}

const DisplayComponent: FC<Props> = ({ displayList }) => {
  const classes = useStyles();
  return displayList && displayList.name ? (
    <Container className={classes.container}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="name" label={displayList.name}>
          <TreeItem nodeId="version" label={`v${displayList.version}`} />

          <TreeItem nodeId="dependencies" label="dependencies">
            {displayList.dependencies ? (
              Object.entries(displayList.dependencies).map(
                (item: Array<string>) => {
                  return (
                    <TreeItem
                      key={`${item[0]}`}
                      nodeId={`${item[0]}`}
                      label={`${item[0]} @${item[1]}`}
                    />
                  );
                }
              )
            ) : (
              <TreeItem nodeId="noDependencies" label="none" />
            )}
          </TreeItem>

          <TreeItem nodeId="devDependencies" label="devDependencies">
            {displayList.devDependencies ? (
              Object.entries(displayList.devDependencies).map(
                (item: Array<string>) => {
                  return (
                    <TreeItem
                      key={`${item[0]}`}
                      nodeId={`${item[0]}`}
                      label={`${item[0]} @${item[1]}`}
                    />
                  );
                }
              )
            ) : (
              <TreeItem nodeId="noDevDependencies" label="none" />
            )}
          </TreeItem>

          <TreeItem nodeId="peerDependencies" label="peerDependencies">
            {displayList.peerDependencies ? (
              Object.entries(displayList.peerDependencies).map(
                (item: Array<string>) => {
                  return (
                    <TreeItem
                      key={`${item[0]}`}
                      nodeId={`${item[0]}`}
                      label={`${item[0]} @${item[1]}`}
                    />
                  );
                }
              )
            ) : (
              <TreeItem nodeId="noPeerDependencies" label="none" />
            )}
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Container>
  ) : null;
};

export default DisplayComponent;
