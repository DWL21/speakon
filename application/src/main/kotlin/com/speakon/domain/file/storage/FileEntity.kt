package com.speakon.domain.file.storage

import com.speakon.domain.common.storage.BaseEntity
import com.speakon.domain.file.implement.FileStatus
import com.speakon.domain.user.storage.UserEntity
import jakarta.persistence.*

@Entity
@Table(name = "files")
class FileEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    var originalName: String,

    @Column(nullable = false, unique = true)
    var storedName: String,

    @Column(nullable = false)
    var contentType: String,

    @Column(nullable = false)
    var size: Long,

    @Column(nullable = false)
    var path: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    val owner: UserEntity,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: FileStatus = FileStatus.PENDING,

    @Column
    var errorMessage: String? = null
) : BaseEntity()
