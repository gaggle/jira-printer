import React from 'react';

import { Card } from './components/Card/index';
import { Description } from './components/Description/index';
import { Distribute, DistributeEl } from './components/Distribute/index';
import { EpicLink } from './components/EpicLink/index';
import { Grid } from './components/Grid/index';
import { IssueNumber } from './components/IssueNumber/index';
import { IssueType } from './components/IssueType/index';
import { Stack } from './components/Stack/index';
import { StartStopBlock } from './components/StartStopBlock/index';

export function Issue(): JSX.Element {
  return <>
    <Grid>
      <Card>
        <Stack>
          <Description>Connect table with basic "file size too big" customer data</Description>
          <EpicLink>DA ready for feedback via SIP</EpicLink>
          <Distribute>
            <DistributeEl>
              <IssueType type="story"/>
            </DistributeEl>
            <DistributeEl center={true} grow={true}>
              <StartStopBlock style={{ paddingLeft: '1em' }}/>
            </DistributeEl>
            <DistributeEl center={true}>
              <IssueNumber>SEC-9876</IssueNumber>
            </DistributeEl>
          </Distribute>
        </Stack>
      </Card>
      <Card>
        <Stack>
          <Description>Connect table with basic "file size too big" customer data</Description>
          <EpicLink>DA ready for feedback via SIP</EpicLink>
          <Distribute>
            <DistributeEl>
              <IssueType type="story"/>
            </DistributeEl>
            <DistributeEl center={true} grow={true}>
              <StartStopBlock style={{ paddingLeft: '1em' }}/>
            </DistributeEl>
            <DistributeEl center={true}>
              <IssueNumber>SEC-9876</IssueNumber>
            </DistributeEl>
          </Distribute>
        </Stack>
      </Card>
    </Grid>
  </>;
}
