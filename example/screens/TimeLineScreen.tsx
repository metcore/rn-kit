import {
  Color,
  Container,
  Timeline,
  TimelineItem,
  Typography,
} from '@herca/rn-kit';

export default function TimeLineScreen() {
  return (
    <Container>
      <Timeline>
        <TimelineItem>
          <Typography variant="t3" weight="medium" color={Color.gray[300]}>
            Pemberi Persetujuan
          </Typography>
          <Typography variant="t1">tes</Typography>
          <Typography variant="t3" weight="medium" color={Color.gray[300]}>
            Pemberi Persetujuan
          </Typography>
          <Typography>tes</Typography>
        </TimelineItem>
        <TimelineItem color="warning">
          <Typography>tes</Typography>
        </TimelineItem>
        <TimelineItem color="warning">
          <Typography>tes</Typography>
        </TimelineItem>
      </Timeline>
    </Container>
  );
}
