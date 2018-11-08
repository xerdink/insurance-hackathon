# Copyright (c) 2018, Exfil Inc.
# Anadolu Sigorta A.S Hackathon
#
# People counter with pose estimation on video streams

FROM jgravity/tensorflow-opencv:odin

MAINTANER orhaneee

# TF Pose Estimation
RUN git clone https://github.com/PJunhyuk/people-counting-pose
RUN cd people-counting-pose && chmod u+x ./compile.sh
RUN ./compile.sh && cd models/coco && chmod u+x download_models_wget.sh
RUN ./download_models_wget.sh && cd -

RUN cd testset && chmod u+x ./download_testset_wget.sh && ./download_testset_wget.sh && cd -

CMD ["/usr/bin/bash"]
