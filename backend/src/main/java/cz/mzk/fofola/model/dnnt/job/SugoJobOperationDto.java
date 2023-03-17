package cz.mzk.fofola.model.dnnt.job;

import cz.mzk.fofola.constants.dnnt.Direction;
import cz.mzk.fofola.constants.dnnt.JobSessionType;
import cz.mzk.fofola.constants.dnnt.Requestor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.joda.time.LocalDate;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class SugoJobOperationDto {
    private JobSessionType sessionType;
    private Direction direction;
    private Requestor requestor;
    private Range range;
    private Solr solr;
}

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
class Range {
    private LocalDate from;
    private LocalDate to;
}

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
class Solr {
    private String query;
    private String parameters;
}
