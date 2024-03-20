import { PostType } from '@/types/PostType';
import Fuse from 'fuse.js';
import { TextWithBoldRanges } from './TextWithBoldRanges';
import { List } from './List';
import { consts } from '@/assets/consts';

export function Results(props: { results: Fuse.FuseResult<PostType>[] }) {
  const { results } = props;
  return (
    <List>
      {results.length ? (
        results.map((value) => {
          return (
            <li>
              <p>{`${consts.userIdLabel} ${value.item.userId}`}</p>
              <p>{`${consts.idLabel} ${value.item.id}`}</p>
              <span>{consts.titleLabel + ' '}</span>
              <TextWithBoldRanges
                text={value.item.title}
                boldRanges={value.matches?.length ? (value.matches[0].indices as Fuse.RangeTuple[]) : []}
              />
              <p>{`${consts.bodyLabel} ${value.item.body}`}</p>
              <hr />
            </li>
          );
        })
      ) : (
        <p>{consts.noResults}</p>
      )}
    </List>
  );
}
