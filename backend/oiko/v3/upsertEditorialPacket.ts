import { oikoQueries } from '../queries.ts';
import type { V3PublicationStatus, V3Visibility } from './types.ts';

/** Typed editorial packet fields — prevents positional param misalignment on the 16-column upsert. */
export type EditorialPacketRow = {
  editionDate: string;
  pipelineVersion: string;
  status: V3PublicationStatus | string;
  visibility: V3Visibility;
  qualityState: 'passed' | 'failed';
  packetJson: string | null;
  draftJson: string | null;
  evidenceJson: string | null;
  contentJson: string | null;
  marketContextJson: string | null;
  assetManifestJson: string | null;
  html: string | null;
  text: string | null;
  archiveTeaser: string | null;
  publicationReason: string;
  publicationReasonCode: string;
};

/** Type-safe wrapper around the 16-column positional upsert — maps named fields to correct column order. */
export function upsertEditorialPacket(row: EditorialPacketRow) {
  oikoQueries.v3.editorialPackets.upsert.run(
    row.editionDate,
    row.pipelineVersion,
    row.status,
    row.visibility,
    row.qualityState,
    row.packetJson,
    row.draftJson,
    row.evidenceJson,
    row.contentJson,
    row.marketContextJson,
    row.assetManifestJson,
    row.html,
    row.text,
    row.archiveTeaser,
    row.publicationReason,
    row.publicationReasonCode,
  );
}
