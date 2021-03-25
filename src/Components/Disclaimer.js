import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const Disclaimer = () => {
  return (
    <Card>
      <CardContent>
        <Typography color="textPrimary">Disclaimer</Typography>
        <Typography color="textSecondary">
          This site does not own, host, copy or distribute any of the content.
          As a view-only service, we do not take responsibility for users
          behavior, such as viewing content not authorized for use by its owner.
          The service constitutes a fair-use of any copyrighted material as
          provided for in section 107 of the US copyrigth law.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Disclaimer;
